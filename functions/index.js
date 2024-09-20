export async function onRequest(context) {
  // 获取请求的 URL 和路径
  const { request } = context;
  const url = new URL(request.url);

  // 构建目标 URL，这里是转发到 `2argos09.nbxxxxxx.us.kg`
  const targetURL = `https://2argos09.nbxxxxxx.us.kg${url.pathname}`;

  // 返回 301 重定向
  return Response.redirect(targetURL, 301);
}
