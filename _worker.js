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
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    hash = (hash << 5) - hash + ip.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash) % servers.length;
}

async function handleRequest(request) {
  const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'default-ip';

  let url = new URL(request.url);
  url.hostname = servers[getServerIndex(ip)];

  // 创建转发请求，保留原始请求的元数据
  let newRequest = new Request(url, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: request.redirect
  });

  // 直接返回转发的结果（包括 404 响应）
  return fetch(newRequest);
}
