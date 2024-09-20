export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  // 输出调试信息
  console.log(`Pathname: ${url.pathname}`);
  console.log(`Search Params: ${url.search}`);

  const targetURL = `https://2argos09.nbxxxxxx.us.kg${url.pathname}${url.search}`;

  // 输出目标URL调试
  console.log(`Redirecting to: ${targetURL}`);

  // 重定向
  return Response.redirect(targetURL, 301);
}
