import React from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from "tsparticles";
import '../less/index.css'

function ParticleBackground() {

    const particlesInit = React.useCallback(async (engine) => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = React.useCallback(async (container) => {
    }, []);

  return (
    <Particles
    id="tsparticles"
    init={particlesInit}
    loaded={particlesLoaded}
    options={{
      fullScreen: {
        enable: true,
        zIndex: 0,
      },
        background: {
            color: '#151a21',
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
              value: 70,
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
                color: "#f28b24"
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
              value: 6,
              random: true
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#f28b24",
              opacity: 0.3,
              width: 2
            },
            move: {
              enable: true,
              speed: 3,
              direction: "bottom",
              angle: 20,
              random: true,
              straight: false,
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
                distance: 300,
                line_linked: {
                  opacity: 0.7
                }
              },
              bubble: {
                distance: 300,
                size: 9,
                duration: 1,
                opacity: 0.8,
                speed: 2
              },
              repulse: {
                distance: 100,
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
        }
      }
    />
  )
}

export default ParticleBackground