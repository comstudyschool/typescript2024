// 작성자: 김범준
// 작성일: 2024-10-22
// 연락처: comstudy21@naver.com

interface DraggableBox {
    box: HTMLElement;
    xGap: number;
    yGap: number;
 }

 // DraggbleBox 인터페이스 구현
 class BoxEvent implements DraggableBox {
    box: HTMLElement;
    xGap: number;
    yGap: number;
    
    constructor(elementId:string, x:number, y:number) {
        const element = document.getElementById(elementId);
        this.box = element;
        this.box.style.left = x + 'px'
        this.box.style.top = y + 'px';

        this.initDrag();
    }

    private initDrag() {
        console.log('initDrag() 호출 ...');
        this.box.onmousedown = (event: MouseEvent) => {
            // 다운캐스팅 (반대는 업캐스팅)
            const target = event.target as HTMLElement;
            // console.dir(target);
            // console.log("typeof =>", typeof target);
            // console.log("instanceof =>", target instanceof HTMLElement );
            // console.log(target.innerHTML);
            // console.log(target === this.box);

            // 움직이려는 엘리먼트의 좌표와 마우스 좌표간의 거리를 임시 저장.
            this.xGap = event.clientX - target.offsetLeft;
            this.yGap = event.clientY - target.offsetTop;

            document.onmousemove = (event:MouseEvent)=>{
                //console.log(event.clientX, event.clientY);
                let x = event.clientX - this.xGap;
                let y = event.clientY - this.yGap;
                target.style.left = x + 'px';
                target.style.top = y + 'px';
            };

            document.onmouseup = (event:MouseEvent) => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    }
}

 window.onload = () => {
    new BoxEvent('box0', 100, 100);
    new BoxEvent('box1', 200, 100);
    new BoxEvent('box2', 300, 100);
    new BoxEvent('box3', 400, 100);
 }