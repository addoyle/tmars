import { toPlainObject } from 'lodash';

export function sse(Class) {
  return (...args) => {
    const newClass = new Class(...args);

    newClass.listeners = [];
    newClass.addListener = listener => newClass.listeners.push(listener);
    newClass.dropListener = listener => {
      const i = newClass.listeners.indexOf(listener);
      if (i >= 0) {
        newClass.listeners.splice(i, 1);
      }
    }
    newClass.stream = (req, res) => {
      res.setHeader('Connection', 'keep-alive')
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Content-Type', 'text/event-stream');
      res.flushHeaders();

      newClass.addListener(res);

      res.on('close', () => {
        newClass.dropListener(res);
        res.end();
      });
    }

    return newClass;
  }
}

export function push(target, name, descriptor) {
  const func = descriptor.value;

  descriptor.value = function(...args) {
    func.apply(this, args);

    this.listeners.forEach(listener => listener.write(`data: ${JSON.stringify(args)}\n\n`))
  };

  return descriptor;
}

export default function(type) {
  if (!type.instance) {
    type.instance = new type();
  }

  return type.instance;
}