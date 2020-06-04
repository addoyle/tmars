export function sse(Class) {
  return (...args) => {
    const newClass = new Class(...args);

    newClass.listeners = {};
    newClass.addListener = (listener, id) => {
      if (newClass.listeners[id] === undefined) {
        newClass.listeners[id] = [];
      }
      newClass.listeners[id].push(listener);
    };
    newClass.dropListener = (listener, id) => {
      const i = newClass.listeners[id]?.indexOf(listener);
      if (i >= 0) {
        newClass.listeners[id]?.splice(i, 1);
      }
    };
    newClass.stream = (req, res) => {
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Content-Type', 'text/event-stream');
      res.flushHeaders();

      // Pass any parameters in via the query property
      newClass.query = req.query;

      newClass.addListener(res, req.params.id);

      res.on('close', () => {
        newClass.dropListener(res, req.params.id);
        res.end();
      });
    };

    return newClass;
  };
}

export function push(
  mapper = function (res) {
    return res;
  }
) {
  return function (target, name, descriptor) {
    const func = descriptor.value;
    descriptor.value = function (...args) {
      const response = func.apply(this, args);

      this.listeners[args[0]].forEach((listener, i) => {
        listener.write(
          `data: ${JSON.stringify(mapper(response, listener, i))}\n\n`
        );
        listener.flush();
      });
    };

    return descriptor;
  };
}

export default function Service(type) {
  if (!type.instance) {
    type.instance = new type();
  }

  return type.instance;
}
