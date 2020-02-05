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

    return newClass;
  }
}

export function push(target, name, descriptor) {
  // console.log(target, name, descriptor);
  // console.log(arguments);

  // target.listeners.forEach(listener => {
  //   listener.write(`data: ${JSON.stringify(log)}\n\n`);
  // });

  return descriptor;
}

export default function(type) {
  if (!type.instance) {
    type.instance = new type();
  }

  return type.instance;
}