/**
 * Marks a class to serve as a service for server-sent events
 *
 * @param {class} Class class to serve as a SSE service
 */
export function sse(Class) {
  return (...args) => {
    const newClass = new Class(...args);

    // Map of listeners, keying off game id
    newClass.listeners = {};

    /**
     * Add a listener for events
     *
     * @param {listener} listener Listener
     * @param {string} id Game id
     */
    newClass.addListener = (listener, id) => {
      if (newClass.listeners[id] === undefined) {
        newClass.listeners[id] = [];
      }
      newClass.listeners[id].push(listener);
    };

    /**
     * Remove a listener
     *
     * @param {listener} listener
     * @param {string} id
     */
    newClass.dropListener = (listener, id) => {
      const i = newClass.listeners[id]?.indexOf(listener);
      if (i >= 0) {
        newClass.listeners[id]?.splice(i, 1);
      }
    };

    /**
     * Handles request for event streaming
     *
     * @param {Request} req Request for stream events
     * @param {Response} res Response for stream events
     */
    newClass.stream = (req, res) => {
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Content-Type', 'text/event-stream');
      res.flushHeaders();

      // Pass any parameters in via the query property
      newClass.query = req.query;

      // Add the listener to the pool
      newClass.addListener(res, req.params.id);

      // When connection is closed, remove listener
      res.on('close', () => {
        newClass.dropListener(res, req.params.id);
        res.end();
      });
    };

    return newClass;
  };
}

/**
 * Binds a method to push its return value to the listeners
 *
 * @param {mapper} mapper Annotation mapper
 */
export function push(
  // Optional post-filter function
  mapper = function (res) {
    return res;
  }
) {
  return function (target, name, descriptor) {
    // The annotated function
    const func = descriptor.value;

    // Set the value to the response of the annotated function
    descriptor.value = function (...args) {
      // Invoke function
      const response = func.apply(this, args);

      // Write response to listeners
      this.listeners[args[0]]?.forEach((listener, i) => {
        listener.write(
          `data: ${JSON.stringify(mapper(response, listener, i))}\n\n`
        );
        listener.flush();
      });
    };

    return descriptor;
  };
}

/**
 * Service is a singleton
 *
 * @param {object} type
 */
export default function Service(type) {
  if (!type.instance) {
    type.instance = new type();
  }

  return type.instance;
}
