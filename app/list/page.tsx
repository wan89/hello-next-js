'use client'

import Link from "next/link"

export default function ListPage() {
  
    return (
      <div className="contents-wrapper">
        <h2>현재 디렉토리는 /list 라우트 입니다</h2>
        <a>/app/[라우트명]/[page.tsx] 파일 생성만 하면 라우트가 됩니다</a>
        <br/>
        <Link href={"/list/a"}>[더 세부라우트]</Link>
      </div>
    )
  }