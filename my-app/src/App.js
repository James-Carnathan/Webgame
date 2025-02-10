import React, { useEffect } from 'react';
import './App.css';
import Phaser from 'phaser';

function App() {
  useEffect(() => {
    const game = new Phaser.Game({
      type: Phaser.AUTO,
      width: 1280,
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
        preload: function () {
          // No need to load images for enemies, as we're using circles
        },
        create: function () {
          // Create player as a blue circle
          this.player = this.add.circle(400, 300, 30, 0x0000ff);
          this.physics.world.enable(this.player);
          this.player.body.setCollideWorldBounds(true);
          this.cursors = this.input.keyboard.createCursorKeys();

          // Create enemies as red circles
          this.enemies = this.physics.add.group();

          for (let i = 0; i < 10; i++) {
            let enemy = this.add.circle(Phaser.Math.Between(0, 1280), Phaser.Math.Between(0, 720), 20, 0xff0000);
            this.physics.world.enable(enemy);
            enemy.body.setCollideWorldBounds(true);
            this.enemies.add(enemy);
          }
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
          this.player.x = Phaser.Math.Clamp(this.player.x, 30, 1250);
          this.player.y = Phaser.Math.Clamp(this.player.y, 30, 690);

          this.enemies.children.iterate((enemy) => {
            if (enemy) {
              this.physics.moveToObject(enemy, this.player, 50);
            }
          });
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
