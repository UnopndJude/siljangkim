import Link from 'next/link'

export default function Home() {
  return (
    <>
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              김실장넷
            </h1>
            <p className="text-2xl text-gray-700 mb-4">
              병원 상담실장 & 코디네이터 평판 커뮤니티
            </p>
            <p className="text-lg text-gray-600 mb-8">
              병원 관계자 전용 · 의사면허증 또는 사업자번호 인증 필수
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/register" className="px-8 py-3 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition">
                시작하기
              </Link>
              <Link href="/about" className="px-8 py-3 text-lg font-medium text-blue-600 bg-white hover:bg-gray-50 rounded-lg shadow-md transition">
                더 알아보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            김실장넷의 특징
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                철저한 신원 인증
              </h3>
              <p className="text-gray-600">
                의사면허증 또는 사업자번호를 통해 병원 관계자만 가입 가능한 폐쇄형 커뮤니티
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                익명성 보장
              </h3>
              <p className="text-gray-600">
                평가 작성자의 신원을 보호하여 솔직한 평가가 가능한 안전한 환경 제공
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                상호 평가 시스템
              </h3>
              <p className="text-gray-600">
                평가를 작성해야 다른 평가를 열람할 수 있는 공정한 정보 공유 시스템
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            이용 방법
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">
                    회원가입 및 인증
                  </h4>
                  <p className="text-gray-600">
                    의사면허증 또는 병원 사업자번호로 병원 관계자임을 인증합니다.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">
                    평가 작성
                  </h4>
                  <p className="text-gray-600">
                    함께 일했던 상담실장이나 코디네이터에 대한 평가를 작성합니다.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">
                    평가 열람
                  </h4>
                  <p className="text-gray-600">
                    평가를 작성하면 다른 사용자들의 평가를 열람할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}