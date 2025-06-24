const target = {
  name: "John",
  age: 30
};

const isAdmin = true;
const minAge = 0;
const maxAge = 120;

// create proxy
const proxy = new Proxy(target, {
  // intercept get
  get: function (target, prop) {
    console.log(`Getting ${String(prop)}`);
    return target[prop];
  },

  // intercept set
  set: function(target, prop, value) {
    console.log(`Setting ${String(prop)} to ${value}`);
    target[prop] = value;
    return true;
  }
});

// create proxy
const adminProxy = new Proxy(target, {
  // intercept get
  get: function (target, prop) {
    if (isAdmin) {
      console.log(`Getting ${String(prop)}`);
      return target[prop];
    }
    console.log("Access denied");
    return null;
  },
  // intercept set
  set: function(target, prop, value) {
    // consequently validate age
    if (prop === "age") {
      if (value < minAge) {
        console.log("Age cannot be negative");
        return false;
      } else if (value > maxAge) {
        console.log(`Age cannot be greater than ${maxAge}`);
        return false;
      }
    }

    if (prop === "name") {
      console.log(`Setting ${String(prop)} to ${value}`);
      target[prop] = value;
      return true;
    }

    console.log(`Setting ${String(prop)} to ${value}`);
    target[prop] = value;
    return true;
  }
});

console.log(proxy.name);
proxy.name = "Jane";
console.log(proxy.name);

console.log(adminProxy.name);
adminProxy.name = "Jane";
console.log(adminProxy.name);
