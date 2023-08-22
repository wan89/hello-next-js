'use client';

import { MouseEvent } from "react";
import Swal from "sweetalert2";

export default function Home() {
  const alertTest = (e:MouseEvent)=> {
    console.log(e); 
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href="">Why do I have this issue?</a>'
    });
  }

  return (
    <>
      <img 
        src="https://marketplace.canva.com/EAD2xI0GoM0/1/0/1600w/canva-%ED%95%98%EB%8A%98-%EC%95%BC%EC%99%B8-%EC%9E%90%EC%97%B0-%EC%98%81%EA%B0%90-%EC%9D%B8%EC%9A%A9%EB%AC%B8-%EB%8D%B0%EC%8A%A4%ED%81%AC%ED%86%B1-%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4-rssvAb9JL4I.jpg"
        alt='test이미지'
        />
      {/* contents-wrapper div를 감싸면 동적 사이즈가 적용되며 감싸지 않으면 창의 100%의 사이즈로 적용됩니다. */}
      <div className="contents-wrapper">
        <h2>메인페이지</h2>
        <button onClick={alertTest}>얼럿 테스트</button>
      </div>
    </>
  )
}

