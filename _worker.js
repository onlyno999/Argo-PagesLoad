export default {
  async fetch(request, env, ctx) {
    return handleRequest(request);
  }
}

const servers = [
  'argos09.nbxxxxxx.us.kg',
  '2argos09.nbxxxxxx.us.kg',
  '3argos09.nbxxxxxx.us.kg',
  '4argos09.nbxxxxxx.us.kg',
  '5argos09.nbxxxxxx.us.kg'
];

function getServerIndex(ip) {
  // 使用简单的散列函数，可以根据需要改进
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    hash = (hash << 5) - hash + ip.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash) % servers.length;
}

async function handleRequest(request) {
  // 获取请求的源 IP 地址（可以通过 headers 或其他方式获得）
  const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'default-ip';

  // 选择目标 URL
  let url = new URL(request.url);
  url.hostname = servers[getServerIndex(ip)];

  // 创建转发请求，保留原始请求的元数据
  let newRequest = new Request(url, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: request.redirect
  });

  // 尝试发送请求，捕获可能的错误
  try {
    return await fetch(newRequest);
  } catch (error) {
    // 返回404错误，表示找不到资源，但这是正常行为
    return new Response('404 Not Found', { status: 404 });
  }
}
