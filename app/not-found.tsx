'use client';
import { Props } from "next/script";
import styled from "styled-components";

export default function NotFound() {

    return (
      <div className="contents-wrapper">
        <h2>404 error! </h2>
        <p>주소가 잘못되었습니다 :(</p>
      </div>
    );
  }