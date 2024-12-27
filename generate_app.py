import os
from pathlib import Path

def create_default_files():
    app_dir = Path('./app')
    app_dir.mkdir(exist_ok=True)
    
    files_content = {
        'layout.tsx': "'use client'\n\nexport default function RootLayout({ children }) {\n  return (\n    <html>\n      <body>{children}</body>\n    </html>\n  )\n}",
        'page.tsx': "export default function Home() {\n  return (\n    <main>\n      <h1>Home Page</h1>\n    </main>\n  )\n}",
        'loading.tsx': "export default function Loading() {\n  return <div>Loading...</div>\n}",
        'not-found.tsx': "export default function NotFound() {\n  return (\n    <div>\n      <h2>Not Found</h2>\n      <p>Could not find requested resource</p>\n    </div>\n  )\n}",
        'error.tsx': "'use client'\n\nexport default function Error({\n  error,\n  reset,\n}) {\n  return (\n    <div>\n      <h2>Something went wrong!</h2>\n      <button onClick={() => reset()}>Try again</button>\n    </div>\n  )\n}",
        'global-error.tsx': "'use client'\n\nexport default function GlobalError({\n  error,\n  reset,\n}) {\n  return (\n    <html>\n      <body>\n        <h2>Something went wrong!</h2>\n        <button onClick={() => reset()}>Try again</button>\n      </body>\n    </html>\n  )\n}",
        'route.ts': "export async function GET(request) {\n  return new Response('Hello, Next.js!')\n}",
        'template.tsx': "export default function Template({ children }) {\n  return <div>{children}</div>\n}",
        'default.tsx': "export default function Default() {\n  return <div>Fallback UI</div>\n}"
    }
    
    for filename, content in files_content.items():
        file_path = app_dir / filename
        if not file_path.exists():
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Created: {filename}")
        else:
            print(f"Exists: {filename}")

if __name__ == "__main__":
    create_default_files()