'use client'
import SellItemContainer from "../../components/SellItemContainer";

export default function ListPage() {
    let name = 'park';
    let datas = ['a','b','c','d'];
    
    return (
      <div>
        <h2>list페이지1</h2>
        <div>
          { <SellItemContainer datas={datas}/> }
        </div>
      </div>
    )
  }
