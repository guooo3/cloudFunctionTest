import cloud from "@hw-agconnect/cloud";

@Entry
@Component
struct MyIndex {
  @State message: string = ''

  build() {
    Row() {
      Column() {
        Button('调用云函数')
          .fontSize(20)
          .onClick(async ()=>{
            const result = await cloud.callFunction({
              name: 'hello',
              version: '$latest',
              params: {}
            })
            console.log(result.getValue())
            this.message = result.getValue().message
          })
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
      }
      .width('100%')
    }
    .height('100%')
  }
}