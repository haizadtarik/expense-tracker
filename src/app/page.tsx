export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            ExpenseTracker
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Take control of your finances with our beautiful, accessible expense tracking application
          </p>
        </header>

        <main className="max-w-6xl mx-auto">
          {/* Feature showcase cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="expense-card p-6 animate-slide-up">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Visual Analytics
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Beautiful charts and graphs to visualize your spending patterns
              </p>
            </div>

            <div className="expense-card p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 bg-success-100 dark:bg-success-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-success-600 dark:text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Secure & Private
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Your financial data stays secure with industry-standard protection
              </p>
            </div>

            <div className="expense-card p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-warning-600 dark:text-warning-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Lightning Fast
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Built with Next.js 15 and optimized for performance
              </p>
            </div>
          </div>

          {/* Category badges showcase */}
          <div className="expense-card p-6 mb-8">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Expense Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="category-badge category-food">Food & Dining</span>
              <span className="category-badge category-transport">Transportation</span>
              <span className="category-badge category-entertainment">Entertainment</span>
              <span className="category-badge category-shopping">Shopping</span>
              <span className="category-badge category-health">Health & Fitness</span>
              <span className="category-badge category-utilities">Utilities</span>
              <span className="category-badge category-other">Other</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="text-center">
            <div className="flex gap-4 items-center justify-center flex-col sm:flex-row">
              <button className="expense-button">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Expense
              </button>
              <button className="expense-button-secondary">
                View Dashboard
              </button>
            </div>
          </div>
        </main>

        <footer className="text-center mt-16 text-slate-500 dark:text-slate-400">
          <p>Built with Next.js 15, TypeScript, Tailwind CSS v4, and ❤️</p>
        </footer>
      </div>
    </div>
  );
}
