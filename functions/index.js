export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  // 构建目标重定向 URL
  const targetURL = `https://2argos09.nbxxxxxx.us.kg${url.pathname}${url.search}`;

  // 返回 301 永久重定向
  return Response.redirect(targetURL, 301);
}
