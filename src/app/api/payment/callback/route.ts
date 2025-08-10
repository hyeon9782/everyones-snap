import { NextRequest } from "next/server";

// app/api/payment/callback/route.ts
export async function POST(request: NextRequest) {
  console.log("🔍 나이스페이 콜백 API 호출됨 (POST)");

  try {
    // FormData 파싱
    const formData = await request.formData();

    console.log("📝 받은 FormData:");
    const formDataObj: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      console.log(`  ${key}: ${value}`);
      formDataObj[key] = value as string;
    }

    const authResultCode = formDataObj.authResultCode || "";
    const authResultMsg = formDataObj.authResultMsg || "";
    const tid = formDataObj.tid || "";
    const orderId = formDataObj.orderId || ""; // 이것이 paymentIdx
    const amount = formDataObj.amount || "";
    const signature = formDataObj.signature || "";

    // HTML 응답으로 자동 리다이렉트
    // 브라우저가 받아서 자동으로 GET 요청으로 전환
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>결제 처리 중...</title>
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background: #f5f5f5;
            }
            .loading {
              text-align: center;
            }
            .spinner {
              border: 3px solid #f3f3f3;
              border-top: 3px solid #3498db;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              animation: spin 1s linear infinite;
              margin: 0 auto 20px;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          </style>
        </head>
        <body>
          <div class="loading">
            <div class="spinner"></div>
            <p>결제 처리 중입니다...</p>
          </div>
          
          <form id="paymentForm" method="GET" action="/payment/callback" style="display: none;">
            <input type="hidden" name="authResultCode" value="${escapeHtml(
              authResultCode
            )}">
            <input type="hidden" name="authResultMsg" value="${escapeHtml(
              authResultMsg
            )}">
            <input type="hidden" name="tid" value="${escapeHtml(tid)}">
            <input type="hidden" name="paymentIdx" value="${escapeHtml(
              orderId
            )}">
            <input type="hidden" name="amount" value="${escapeHtml(amount)}">
            <input type="hidden" name="signature" value="${escapeHtml(
              signature
            )}">
          </form>
          
          <script>
            // 즉시 폼 제출
            document.getElementById('paymentForm').submit();
            
            // 혹시 제출이 안 되는 경우를 대비한 fallback
            setTimeout(function() {
              const params = new URLSearchParams({
                authResultCode: '${escapeJs(authResultCode)}',
                authResultMsg: '${escapeJs(authResultMsg)}',
                tid: '${escapeJs(tid)}',
                paymentIdx: '${escapeJs(orderId)}',
                amount: '${escapeJs(amount)}',
                signature: '${escapeJs(signature)}'
              });
              window.location.href = '/payment/callback?' + params.toString();
            }, 100);
          </script>
        </body>
      </html>
    `;

    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        // 캐시 방지
        "Cache-Control": "no-store, no-cache, must-revalidate",
        Pragma: "no-cache",
      },
    });
  } catch (error) {
    console.error("🔥 콜백 처리 중 오류:", error);

    // 에러 발생 시에도 HTML 응답
    const errorHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>결제 처리 실패</title>
        </head>
        <body>
          <script>
            alert('결제 처리 중 오류가 발생했습니다.');
            window.location.href = '/payment/fail?msg=' + encodeURIComponent('서버 오류가 발생했습니다.');
          </script>
        </body>
      </html>
    `;

    return new Response(errorHtml, {
      status: 200, // 브라우저가 받을 수 있도록 200 반환
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }
}

// XSS 방지를 위한 HTML 이스케이프 함수
function escapeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// JavaScript 문자열 이스케이프 함수
function escapeJs(str: string): string {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t");
}
