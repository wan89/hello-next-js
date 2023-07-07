export default function SellItemContainer(props:any){
    return (
      <div>
          {
            props.datas.map((data:string, idx:number) => {
              return (
                <p key={idx}>{data}</p>
              )
            })
          }
        </div>
    )
  }