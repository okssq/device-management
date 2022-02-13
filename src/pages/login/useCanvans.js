import { onMounted, onBeforeUnmount } from "vue";
const useCanvas = () => {
  const SEPARATION = 100,
    AMOUNTX = 60,
    AMOUNTY = 40;
  let container;
  let camera, scene, renderer;
  let particles,
    particle,
    count = 0;

  //浏览器大小改变时重新渲染
  const onWindowResize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };
  //将相机和场景渲染到页面上
  const render = () => {
    let i = 0;
    //更新粒子的位置和大小
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        particle = particles[i++];
        //更新粒子位置
        particle.position.y =
          Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50;
        //更新粒子大小
        particle.scale.x =
          particle.scale.y =
          particle.scale.z =
            ((Math.sin((ix + count) * 0.3) + 1) * 4 +
              (Math.sin((iy + count) * 0.5) + 1) * 4) *
            50; //正常情况下再放大100倍*1200
      }
    }

    renderer.render(scene, camera);
    count += 0.1;
  };
  const initCanvas = () => {
    container = document.getElementById("canvas-wrap");
    const w = window.innerWidth;
    const h = window.innerHeight;

    //创建透视相机设置相机角度大小等
    camera = new THREE.PerspectiveCamera(120, w / h, 1, 1500);
    camera.position.set(0, 450, 2000); //设置相机位置
    scene = new THREE.Scene(); //创建场景
    particles = new Array();
    const PI2 = Math.PI * 2;
    //设置粒子的大小，颜色位置等
    const material = new THREE.ParticleCanvasMaterial({
      color: 0x0f96ff,
      vertexColors: true,
      size: 4,
      program: function (context) {
        context.beginPath();
        context.arc(0, 0, 0.01, 0, PI2, true); //画一个圆形。此处可修改大小。
        context.fill();
      },
    });
    //设置长条粒子的大小颜色长度等
    const materialY = new THREE.ParticleCanvasMaterial({
      color: 0xffffff,
      vertexColors: true,
      size: 1,
      program: function (context) {
        context.beginPath();
        //绘制渐变色的矩形
        const lGrd = context.createLinearGradient(-0.008, 0.25, 0.016, -0.25);
        lGrd.addColorStop(0, "#16eff7");
        lGrd.addColorStop(1, "#0090ff");
        context.fillStyle = lGrd;
        context.fillRect(-0.008, 0.25, 0.016, -0.25); //注意此处的坐标大小
        //绘制底部和顶部圆圈
        context.fillStyle = "#0090ff";
        context.arc(0, 0, 0.008, 0, PI2, true); //绘制底部圆圈
        context.fillStyle = "#16eff7";
        context.arc(0, 0.25, 0.008, 0, PI2, true); //绘制顶部圆圈
        context.fill();
        context.closePath();
        //绘制顶部渐变色光圈
        const rGrd = context.createRadialGradient(0, 0.25, 0, 0, 0.25, 0.025);
        rGrd.addColorStop(0, "transparent");
        rGrd.addColorStop(1, "#16eff7");
        context.fillStyle = rGrd;
        context.arc(0, 0.25, 0.025, 0, PI2, true); //绘制一个圆圈
        context.fill();
      },
    });

    //循环判断创建随机数选择创建粒子或者粒子条
    let i = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const num = Math.random() - 0.1;
        if (num > 0) {
          particle = particles[i++] = new THREE.Particle(material);
        } else {
          particle = particles[i++] = new THREE.Particle(materialY);
        }
        particle.position.x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        particle.position.z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
        scene.add(particle);
      }
    }

    renderer = new THREE.CanvasRenderer();
    renderer.setSize(w, h);
    container.appendChild(renderer.domElement);
    window.addEventListener("resize", onWindowResize, false);
  };
  const animate = () => {
    requestAnimationFrame(animate);
    render();
  };

  const setCanvas = () => {
    initCanvas(); //初始化
    animate(); //动画效果
  };

  onMounted(() => {
    setCanvas();
  });
  onBeforeUnmount(() => {
    window.removeEventListener("resize", onWindowResize);
    while (container && container.firstChild) {
      container.removeChild(container.firstChild);
    }
  });
};

export default useCanvas;
