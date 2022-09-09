import React from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from "tsparticles";

function ParticleBackground() {

    const particlesInit = React.useCallback(async (engine) => {
        console.log(engine);
        await loadFull(engine);
    }, []);

    const particlesLoaded = React.useCallback(async (container) => {
        await console.log(container);
    }, []);

  return (
        <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
            background: {
                color: '#151a21'
            },
            fpsLimit: 60,
            interactivity: {
                detectsOn: 'canvas',
                events: {
                    resize: true,
                }
            },
            particles: {
                number: {
                  value: 40,
                  density: {
                    enable: true,
                    value_area: 500
                  }
                },
                color: {
                  value: "#FFFFFF"
                },
                shape: {
                  type: "polygon",
                  stroke: {
                    width: 2,
                    color: "#ff9800"
                  },
                  polygon: {
                    nb_sides: 6
                  },
                },
                opacity: {
                  value: 0.5,
                  random: true
                },
                size: {
                  value: 4,
                  random: true
                },
                line_linked: {
                  enable: false,
                  distance: 200,
                  color: "#FFFFFF",
                  opacity: 0.3,
                  width: 2
                },
                move: {
                  enable: true,
                  speed: 5,
                  direction: "bottom",
                  angle: 10,
                  random: true,
                  straight: true,
                  out_mode: "out",
                  bounce: false,
                  attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                  }
                }
              },
              interactivity: {
                detect_on: "canvas",
                events: {
                  onhover: {
                    enable: true,
                    mode: ["grab", "bubble"]
                  },
                  onclick: {
                    enable: true,
                    mode: "push"
                  },
                  resize: true
                },
                modes: {
                  grab: {
                    distance: 400,
                    line_linked: {
                      opacity: 0.7
                    }
                  },
                  bubble: {
                    distance: 400,
                    size: 12,
                    duration: 1,
                    opacity: 0.8,
                    speed: 2
                  },
                  repulse: {
                    distance: 400,
                    duration: 0.4
                  },
                  push: {
                    particles_nb: 20
                  },
                  remove: {
                    particles_nb: 10
                  }
                }
              },
              retina_detect: true
            }}/>
  )
}

export default ParticleBackground