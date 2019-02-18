let ctx: Worker = self as any;

ctx.addEventListener('message', (message) => {
  console.log(message);
});
