import Layout from "../components/Layout.tsx";
import LoginForm from "../components/LoginForm.tsx";
import Hero from "../components/Hero.tsx";

export default function Landing() {
  return (
    <Layout hideHeader>
      <Hero />

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-12 sm:pt-16 lg:pt-20 px-4 sm:px-8 lg:px-16">
        <section className="text-center mb-10 lg:mb-16">
          <h1 className="text-xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4 leading-snug sm:leading-7 lg:leading-10">
            خوش آمدید به سیستم مدیریت وندورها
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-xs sm:max-w-xl lg:max-w-3xl mx-auto leading-6 sm:leading-7 lg:leading-8">
            سامانه‌ای ساده و هوشمند برای ثبت، مدیریت و مشاهده وندورها روی نقشه و تحلیل عملکرد تیم فروش.
          </p>
        </section>

        <section className="mb-12 sm:mb-16 lg:mb-20 max-w-md sm:max-w-lg lg:max-w-xl mx-auto">
          <LoginForm compact redirectAfterLogin="/dashboard" />
        </section>

        <section className="max-w-5xl mx-auto text-center" id="features">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6 sm:mb-8">
            قابلیت‌های کلیدی
          </h2>

          <div className="mb-8 sm:mb-10 lg:mb-12">
            <img
              src="/2.png"
              alt="افزودن وندور"
              className="rounded-lg shadow-lg mx-auto w-full sm:w-3/4 lg:w-1/1"
            />
            <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-6 sm:leading-7 lg:leading-8 max-w-xl mx-auto">
              افزودن سریع وندورها با اطلاعات تماس و موقعیت دقیق روی نقشه.
            </p>
          </div>

          <div className="mb-8 sm:mb-10 lg:mb-12">
            <img
              src="/3.png"
              alt="نمایش وندورها"
              className="rounded-lg shadow-lg mx-auto w-full sm:w-3/4 lg:w-1/1"
            />
            <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-6 sm:leading-7 lg:leading-8 max-w-xl mx-auto">
              مشاهده و مدیریت همه وندورها روی نقشه با فیلتر، جستجو و ویرایش سریع.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
