export function isExternalUrl(href?: string): boolean {
  if (!href) return false

  const isRelativePath = (href: string) =>
    href.startsWith('/') || // absolute path
    href.startsWith('./') || // relative path
    href.startsWith('../') || // relative path
    href.startsWith('#') // fragment
  const isAbsolutePath = (href: string) => href.includes('://')

  try {
    const url = new URL(href, window.location.origin)

    if (url.origin !== window.location.origin || isAbsolutePath(url.pathname)) {
      return true
    }
    return !isRelativePath(url.pathname)
  } catch {
    // If URL parsing fails, check if it's a relative path or fragment
    return !isRelativePath(href)
  }
}
