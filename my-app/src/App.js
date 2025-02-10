import React, { useEffect } from 'react';
import './App.css';
import Phaser from 'phaser';

function App() {
  useEffect(() => {
    const game = new Phaser.Game({
      type: Phaser.AUTO,
      width: 980,
      height: 720,
      backgroundColor: '#F2F0EF',
      parent: 'gameCanvas',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      scene: {
        preload: function () {},
        create: function () {
          this.player = this.add.circle(400, 300, 30, 0x00ff00);
          this.physics.world.enable(this.player);
          this.player.body.setCollideWorldBounds(true);
          this.cursors = this.input.keyboard.createCursorKeys();
        },
        update: function () {
          if (this.cursors.left.isDown) {
            this.player.x -= 5;
          } else if (this.cursors.right.isDown) {
            this.player.x += 5;
          }
          if (this.cursors.up.isDown) {
            this.player.y -= 5;
          } else if (this.cursors.down.isDown) {
            this.player.y += 5;
          }
          this.player.x = Phaser.Math.Clamp(this.player.x, 30, 950);
          this.player.y = Phaser.Math.Clamp(this.player.y, 30, 690);
        }
      }
    });

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div className="App">
      <h1>Circle Game</h1>
      <div id="gameCanvas" />
    </div>
  );
}

export default App;
