export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white px-4 py-20">
        <div className="container mx-auto text-center">
          <h2 className="mb-6 text-5xl font-bold text-gray-900">
            믿을 수 있는 코디네이터를 찾아보세요
          </h2>
          <p className="mb-8 text-xl text-gray-600">
            실제 고객들의 평가와 리뷰를 통해 검증된 코디네이터를 만나보세요
          </p>
          <div className="mx-auto max-w-2xl">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="지역 또는 코디네이터 이름으로 검색"
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
              <button className="rounded-lg bg-primary-600 px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-primary-700">
                검색
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto">
          <h3 className="mb-12 text-center text-3xl font-bold text-gray-900">
            김실장넷을 선택하는 이유
          </h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                  <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h4 className="mb-2 text-xl font-semibold text-gray-900">검증된 리뷰</h4>
              <p className="text-gray-600">
                실제 고객들의 솔직한 평가와 경험을 바탕으로 한 신뢰할 수 있는 정보
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                  <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <h4 className="mb-2 text-xl font-semibold text-gray-900">다양한 코디네이터</h4>
              <p className="text-gray-600">
                전국 각지의 다양한 분야 전문 코디네이터들을 한 곳에서 비교
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                  <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <h4 className="mb-2 text-xl font-semibold text-gray-900">안전한 거래</h4>
              <p className="text-gray-600">
                투명한 평가 시스템으로 안심하고 코디네이터를 선택할 수 있습니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Coordinators */}
      <section className="bg-gray-50 px-4 py-16">
        <div className="container mx-auto">
          <h3 className="mb-12 text-center text-3xl font-bold text-gray-900">
            인기 코디네이터
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md">
                <div className="p-6">
                  <div className="mb-4 flex items-center">
                    <div className="h-12 w-12 rounded-full bg-gray-300" />
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900">김실장 {i}</h4>
                      <p className="text-sm text-gray-600">서울 강남구</p>
                    </div>
                  </div>
                  <div className="mb-4 flex items-center">
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">(123개 리뷰)</span>
                  </div>
                  <p className="mb-4 text-sm text-gray-600">
                    전문적이고 친절한 상담으로 고객 만족도 1위
                  </p>
                  <button className="w-full rounded-md bg-primary-600 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700">
                    자세히 보기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 px-4 py-16 text-white">
        <div className="container mx-auto text-center">
          <h3 className="mb-4 text-3xl font-bold">
            지금 바로 시작하세요
          </h3>
          <p className="mb-8 text-xl">
            믿을 수 있는 코디네이터와 함께 성공적인 프로젝트를 진행하세요
          </p>
          <div className="flex justify-center gap-4">
            <button className="rounded-lg bg-white px-8 py-3 font-medium text-primary-600 transition-colors hover:bg-gray-100">
              코디네이터 찾기
            </button>
            <button className="rounded-lg border-2 border-white px-8 py-3 font-medium text-white transition-colors hover:bg-white/10">
              코디네이터 등록
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}