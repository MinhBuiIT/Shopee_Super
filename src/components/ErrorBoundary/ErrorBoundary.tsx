import { Component, ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    // Update state to display the error message
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Handle the error here (e.g., send it to the server, log it, etc.)
    console.error(error, errorInfo)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Return a fallback UI when an error occurs
      return (
        <div className='via-greeen-300 flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-800 to-blue-500'>
          <div className='mx-auto w-full max-w-lg rounded-lg bg-white px-10 py-8 shadow-xl'>
            <div className='mx-auto max-w-md space-y-6'>
              <div className='mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16'>
                <div className='mx-auto max-w-screen-sm text-center'>
                  <h1 className='text-primary-600 dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl'>
                    500
                  </h1>
                  <p className='mb-4 text-3xl font-bold tracking-tight text-black md:text-4xl'>
                    Internal Server Error.
                  </p>
                  <p className='mb-4 text-lg font-light text-gray-500 dark:text-gray-400'>
                    We are already working to solve the problem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Return the children inside the ErrorBoundary
    return this.props.children
  }
}

export default ErrorBoundary
