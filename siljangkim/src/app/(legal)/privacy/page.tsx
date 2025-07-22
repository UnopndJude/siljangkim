export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">개인정보처리방침</h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <p className="text-gray-600 mb-4">시행일: 2024년 1월 1일</p>
          <p>
            에이젠틀리(개인사업자, 대표: 황준엽, 이하 "회사")는 김실장넷 서비스를 제공함에 있어 
            정보주체의 개인정보를 보호하고 관련 법령을 준수하기 위해 다음과 같은 개인정보처리방침을 수립하여 공개합니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. 개인정보의 수집 항목 및 방법</h2>
          
          <h3 className="text-xl font-medium mb-2">가. 수집하는 개인정보 항목</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>필수항목: 이메일, 비밀번호, 성명, 소속 병원명</li>
            <li>선택항목: 의사면허번호, 사업자번호</li>
            <li>자동수집항목: 접속IP, 쿠키, 서비스 이용기록, 접속로그</li>
          </ul>

          <h3 className="text-xl font-medium mb-2">나. 수집방법</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>회원가입 과정에서 이용자가 직접 입력</li>
            <li>서비스 이용 과정에서 자동으로 수집</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. 개인정보의 수집 및 이용목적</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>회원관리: 회원제 서비스 이용에 따른 본인확인, 개인 식별, 불량회원의 부정 이용 방지</li>
            <li>서비스 제공: 병원 관계자 인증, 평가 작성 및 열람 서비스 제공</li>
            <li>서비스 개선: 접속빈도 파악, 회원의 서비스 이용에 대한 통계</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. 개인정보의 보유 및 이용기간</h2>
          <p className="mb-4">
            회사는 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 
            단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.
          </p>
          
          <h3 className="text-xl font-medium mb-2">가. 회사 내부 방침에 의한 정보 보유</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>부정가입 및 이용 방지를 위한 기록: 6개월</li>
          </ul>

          <h3 className="text-xl font-medium mb-2">나. 관련 법령에 의한 정보 보유</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래법)</li>
            <li>대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래법)</li>
            <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래법)</li>
            <li>웹사이트 방문기록: 3개월 (통신비밀보호법)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. 개인정보의 제3자 제공</h2>
          <p>
            회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>이용자들이 사전에 동의한 경우</li>
            <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. 개인정보의 파기</h2>
          <p className="mb-4">
            회사는 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다.
          </p>
          
          <h3 className="text-xl font-medium mb-2">가. 파기절차</h3>
          <p className="mb-4">
            이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져 내부 방침 및 기타 관련 법령에 따라 
            일정기간 저장된 후 혹은 즉시 파기됩니다.
          </p>

          <h3 className="text-xl font-medium mb-2">나. 파기방법</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.</li>
            <li>종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. 이용자의 권리와 행사방법</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>개인정보 열람요구</li>
            <li>오류 등이 있을 경우 정정 요구</li>
            <li>삭제요구</li>
            <li>처리정지 요구</li>
          </ul>
          <p className="mt-4">
            이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며, 
            회원탈퇴를 통해 개인정보의 삭제를 요구할 수 있습니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. 개인정보 보호책임자</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="font-semibold mb-2">개인정보 보호책임자</p>
            <ul className="space-y-1">
              <li>성명: 황준엽</li>
              <li>직책: 대표</li>
              <li>연락처: 서비스 내 문의하기 이용</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. 개인정보의 안전성 확보 조치</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>개인정보 취급 직원의 최소화 및 교육</li>
            <li>개인정보의 암호화</li>
            <li>해킹 등에 대비한 기술적 대책</li>
            <li>개인정보에 대한 접근 제한</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. 개인정보처리방침의 변경</h2>
          <p>
            이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 
            삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
          </p>
        </section>

        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">에이젠틀리</h3>
          <p>대표: 황준엽</p>
          <p className="text-sm text-gray-600 mt-2">
            개인정보보호 관련 문의사항은 서비스 내 문의하기를 이용해 주시기 바랍니다.
          </p>
        </div>
      </div>
    </div>
  )
}