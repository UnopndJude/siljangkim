export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">면책조항</h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <p className="text-gray-600 mb-6">
            김실장넷 서비스(이하 "서비스")를 이용하시기 전에 다음의 면책조항을 주의 깊게 읽어주시기 바랍니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. 서비스의 성격</h2>
          <p>
            본 서비스는 병원 관계자들이 상담실장 및 코디네이터에 대한 평가를 공유하는 플랫폼입니다. 
            모든 평가는 개인의 주관적인 경험과 의견에 기반하며, 객관적인 사실과 다를 수 있습니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. 정보의 정확성</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>회사는 회원이 작성한 평가 내용의 정확성, 신뢰성, 최신성을 보증하지 않습니다.</li>
            <li>평가 내용은 작성자의 개인적인 의견이며, 회사의 견해를 대변하지 않습니다.</li>
            <li>서비스에 게시된 정보를 기반으로 한 의사결정에 대한 책임은 전적으로 이용자에게 있습니다.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. 법적 책임의 제한</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>회사는 회원 간 또는 회원과 제3자 간에 발생한 분쟁에 대해 책임을 지지 않습니다.</li>
            <li>서비스 이용으로 인해 발생한 직접적, 간접적, 부수적, 특별 손해에 대해 회사는 책임을 지지 않습니다.</li>
            <li>명예훼손, 프라이버시 침해 등 타인의 권리를 침해하는 내용에 대한 법적 책임은 해당 게시물의 작성자에게 있습니다.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. 서비스 중단</h2>
          <p className="mb-4">
            다음과 같은 경우 회사는 사전 통지 없이 서비스를 일시적으로 또는 영구적으로 중단할 수 있습니다:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>시스템 점검, 보수, 교체 등의 기술적 필요</li>
            <li>해킹, 컴퓨터 바이러스 등 보안상의 위협</li>
            <li>천재지변, 국가비상사태 등 불가항력적 사유</li>
            <li>관련 법령의 변경이나 규제기관의 명령</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. 익명성과 프라이버시</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>평가는 익명으로 작성되나, 법적 요구가 있는 경우 관련 정보가 제공될 수 있습니다.</li>
            <li>회사는 회원의 개인정보를 보호하기 위해 최선을 다하나, 완벽한 보안을 보장할 수 없습니다.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. 저작권 및 지적재산권</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>서비스에 게시된 모든 콘텐츠의 저작권은 해당 작성자에게 있습니다.</li>
            <li>회원은 자신이 작성한 콘텐츠에 대한 모든 책임을 집니다.</li>
            <li>타인의 저작권을 침해하는 콘텐츠는 사전 통지 없이 삭제될 수 있습니다.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. 준거법 및 관할법원</h2>
          <p>
            본 면책조항은 대한민국 법률에 따라 해석되며, 서비스와 관련된 모든 분쟁은 
            회사의 본점 소재지를 관할하는 법원을 전속관할법원으로 합니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. 면책조항의 변경</h2>
          <p>
            회사는 필요한 경우 본 면책조항을 변경할 수 있으며, 
            변경사항은 서비스 내 공지를 통해 사전에 알려드립니다.
          </p>
        </section>

        <div className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-lg">
          <h3 className="font-semibold text-amber-900 mb-2">중요 안내</h3>
          <p className="text-amber-800">
            본 서비스의 모든 정보는 참고용이며, 중요한 의사결정 시에는 
            반드시 추가적인 확인과 검증을 거치시기 바랍니다.
          </p>
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">에이젠틀리</h3>
          <p>대표: 황준엽</p>
          <p className="text-sm text-gray-600 mt-2">
            최종 수정일: 2024년 1월 1일
          </p>
        </div>
      </div>
    </div>
  )
}