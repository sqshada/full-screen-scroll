import { useEffect } from "react";
import "./App.css";

function App() {
  // 获取根元素高度, 页面可视高度
  const viewHeight = document.documentElement.clientHeight;
  // 获取滚动的页数
  const pageNum = document.querySelectorAll(".page-item").length;
  // 初始化当前位置, 距离原始顶部距离
  var currentPosition = 0;

  const throttle = (fn, delay) => {
    let baseTime = 0;
    return function () {
      const currentTime = Date.now();
      if (baseTime + delay < currentTime) {
        fn.apply(this, arguments);
        baseTime = currentTime;
      }
    };
  };

  useEffect(() => {
    const container = document.querySelector(".page-container");
    // 设置页面高度
    container.style.height = viewHeight + "px";

    if (navigator.userAgent.toLowerCase().indexOf("firefox") === -1) {
      document.addEventListener("mousewheel",  throttle(scrollMove, 1000));
    } else {
      document.addEventListener("DOMMouseScroll",  throttle(scrollMove, 1000));
    }
  }, []);

  const scrollMove = (e) => {
    if (e.deltaY > 0) {
      goDown();
    } else {
      goUp();
    }
  };

  // 向下滚动页面
  const goDown = () => {
    if (currentPosition > -viewHeight * (pageNum - 1)) {
      const container = document.querySelector(".page-container");
      currentPosition = currentPosition - viewHeight;
      container.style.top = currentPosition + "px";
    }
  };

  // 向上滚动页面
  const goUp = () => {
    if (currentPosition < 0) {
      const container = document.querySelector(".page-container");
      currentPosition = currentPosition + viewHeight;
      container.style.top = currentPosition + "px";
    }
  };

  return (
    <div className="page-container">
      <div className="page-item">1</div>
      <div className="page-item">2</div>
      <div className="page-item">3</div>
    </div>
  );
}

export default App;
