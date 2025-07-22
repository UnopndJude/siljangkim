export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">이용약관</h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">제1조 (목적)</h2>
          <p>
            이 약관은 에이젠틀리(개인사업자, 대표: 황준엽, 이하 "회사")가 운영하는 김실장넷(이하 "서비스")의 이용조건 및 절차, 
            회사와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">제2조 (정의)</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>"서비스"란 회사가 제공하는 병원 상담실장 및 코디네이터 평판 정보 공유 플랫폼을 의미합니다.</li>
            <li>"회원"이란 의사면허증 또는 사업자번호를 통해 병원 관계자임을 인증하고 본 약관에 동의하여 회원등록을 한 자를 의미합니다.</li>
            <li>"평가"란 회원이 작성한 상담실장 및 코디네이터에 대한 평가 정보를 의미합니다.</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">제3조 (약관의 효력 및 변경)</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>본 약관은 서비스를 이용하고자 하는 모든 회원에 대하여 그 효력을 발생합니다.</li>
            <li>회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있습니다.</li>
            <li>약관이 변경되는 경우 회사는 변경사항을 시행일자 7일 전부터 서비스 내 공지사항을 통해 공지합니다.</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">제4조 (회원가입 및 자격)</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>회원가입은 병원 관계자로서 의사면허증 또는 사업자번호를 통해 인증된 자에 한합니다.</li>
            <li>회원은 회원가입 시 정확한 정보를 제공해야 하며, 변경사항이 있을 경우 즉시 수정해야 합니다.</li>
            <li>타인의 정보를 도용하거나 허위정보를 기재한 경우 서비스 이용이 제한될 수 있습니다.</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">제5조 (서비스 이용)</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>회원은 평가를 작성해야만 다른 회원의 평가를 열람할 수 있습니다.</li>
            <li>작성된 평가는 익명으로 표시되며, 작성자 정보는 공개되지 않습니다.</li>
            <li>회원은 사실에 기반한 객관적인 평가를 작성해야 합니다.</li>
            <li>명예훼손, 욕설, 허위사실 유포 등 부적절한 내용의 평가는 삭제될 수 있습니다.</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">제6조 (개인정보보호)</h2>
          <p>
            회사는 회원의 개인정보를 보호하기 위해 최선을 다하며, 개인정보 처리에 관한 사항은 별도의 개인정보처리방침에 따릅니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">제7조 (회원의 의무)</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>회원은 다음 행위를 하여서는 안 됩니다:
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>타인의 정보 도용</li>
                <li>허위사실 유포 또는 명예훼손</li>
                <li>서비스의 안정적 운영 방해</li>
                <li>기타 관련 법령이나 공서양속에 반하는 행위</li>
              </ul>
            </li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">제8조 (책임제한)</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>회사는 회원이 작성한 평가 내용의 진실성, 정확성에 대해 책임지지 않습니다.</li>
            <li>회사는 회원 상호간 또는 회원과 제3자 간에 서비스를 매개로 발생한 분쟁에 개입하지 않으며, 이로 인한 손해를 배상할 책임이 없습니다.</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">제9조 (분쟁해결)</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>본 약관에 명시되지 않은 사항은 관련 법령에 따릅니다.</li>
            <li>서비스 이용과 관련하여 분쟁이 발생한 경우, 회사의 본점 소재지를 관할하는 법원을 전속관할법원으로 합니다.</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">부칙</h2>
          <p>본 약관은 2024년 1월 1일부터 적용됩니다.</p>
        </section>

        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">에이젠틀리</h3>
          <p>대표: 황준엽</p>
          <p className="text-sm text-gray-600 mt-2">
            문의사항은 서비스 내 문의하기를 이용해 주시기 바랍니다.
          </p>
        </div>
      </div>
    </div>
  )
}