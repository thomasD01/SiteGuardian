
Deno.serve(async req => {

  const { name } = await req.json();

  console.log(`Hello ${name}!`);

  return new Response('Hello world!');
});
