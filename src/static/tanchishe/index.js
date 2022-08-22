function bootstrap() {
  var gameBoard = document.getElementById("game");
  var ITEM_SIZE = 40; // 格子大小
  var SPEED = 150; // 蛇移动速度，ms为单位
  var boardWidth = 30; // 横向格子数量
  var boardHeight = 15; // 竖向格子数量
  var game = createGame(gameBoard, boardWidth, boardHeight, SPEED); // 创建游戏
  var snake = createSnake(); // 创建一条蛇
  var food = createFood(snake); // 创建一个食物
  var score = createScoreBoard(); // 创建分数板
  game.addSnake(snake); // 添加蛇到游戏中
  game.addFood(food); // 添加食物到游戏中
  // for (let index = 0; index < 99; index++) {
  //   game.addFood(createFood(snake)); // 创建99个食物
  // }
  game.setScore(score); // 设置分数板
  game.score.render();  // 渲染分数板
  snake.render(); // 渲染蛇
  food.render();  // 渲染食物
  game.start(); // 开始游戏

  // 游戏整体
  function createGame(gameBoard, width, height, duration) {
    var game = {
      width: width,
      height: height,
      gameBoard: createGameBoard(gameBoard, width, height),
      snake: null,
      foods: [],
      score: null,
      interval: null,
      event: null,
      duration: duration,
      start: function () {
        this.gameBoard.render();
        this.render();
        this.initEvent();
        this.interval = setInterval(
          function () {
            this.snake.move();
            this.checkCollision();
            this.checkFood();
            this.render();
          }.bind(this),
          this.duration
        );
      },
      stop: function () {
        clearInterval(this.interval);
        document.removeEventListener(this.event, this.snake.move);
      },
      addSnake: function (snake) {
        this.snake = snake;
        this.snake.items.forEach(
          function (item) {
            this.gameBoard.element.appendChild(item.element);
          }.bind(this)
        );
      },
      addFood: function (food) {
        food.update(this.snake, this.foods);
        this.foods.push(food);
        this.gameBoard.element.appendChild(food.element);
      },
      setScore: function (score) {
        this.score = score;
        this.gameBoard.element.appendChild(score.element);
      },
      checkCollision: function () {
        var head = this.snake.getHead();
        var body = this.snake.getBody();
        if (
          body.some(function (part) {
            return part.x === head.x && part.y === head.y;
          })
          || head.x < 0 || head.x >= this.width || head.y < 0 || head.y >= this.height
        ) {
          this.stop();
          alert("Game Over");
          return false;
        }
        return true;
      },
      checkFood: function () {
        var head = this.snake.getHead();
        this.foods.forEach(
          function (food) {
            if (food.x === head.x && food.y === head.y) {
              this.score.add();
              var bodyItem = this.snake.grow();
              this.gameBoard.element.appendChild(bodyItem.element);
              food.update(snake);
            }
          }.bind(this)
        );
      },
      render: function () {
        this.snake.render();
        this.foods.forEach(
          function (food) {
            food.render();
          }.bind(this)
        );
      },
      initEvent: function () {
        this.event = function (e) {
          if (e.keyCode === 37) {
            if(this.snake.direction === 'right') return;
            this.snake.setDirection("left");
          }
          if (e.keyCode === 38) {
            if(this.snake.direction === 'down') return;
            this.snake.setDirection("up");
          }
          if (e.keyCode === 39) {
            if(this.snake.direction === 'left') return;
            this.snake.setDirection("right");
          }
          if (e.keyCode === 40) {
            if(this.snake.direction === 'up') return;
            this.snake.setDirection("down");
          }
        };
        document.addEventListener("keydown", this.event.bind(this));
      },
    };
    return game;
  }

  // 游戏界面
  function createGameBoard(gameBoard, width, height) {
    var gameBoard = {
      element: gameBoard,
      width: width,
      height: height,
      render: function () {
        this.element.style.width = this.width * ITEM_SIZE + "px";
        this.element.style.height = this.height * ITEM_SIZE + "px";
      },
    };
    return gameBoard;
  }

  // 计分板
  function createScoreBoard() {
    var score = {
      element: document.createElement("h1"),
      score: 0,
      add: function () {
        this.score++;
        this.render();
      },
      minus: function () {
        this.score--;
        this.render();
      },
      reset: function () {
        this.score = 0;
        this.render();
      },
      render() {
        this.element.innerHTML = '当前分数：' + this.score;
      },
    };
    score.element.className = "score";
    return score;
  }

  // 蛇
  function createSnake() {
    var snake = {
      items: [],
      direction: "right",
      render: function () {
        this.items.forEach(function (item) {
          item.render();
        });
      },
      getHead: function () {
        return this.items[this.items.length - 1];
      },
      getBody: function () {
        return this.items.slice(0, this.items.length - 1);
      },
      move: function () {
        var snake = this;
        for (var i = 0; i < snake.items.length; i++) {
          var item = snake.items[i];
          if (item.type === 'snakeHead') {
            switch (this.direction) {
              case "right":
                if (this.direction === "left") return;
                item.x++;
                break;
              case "left":
                if (this.direction === "right") return;
                item.x--;
                break;
              case "up":
                if (this.direction === "down") return;
                item.y--;
                break;
              case "down":
                if (this.direction === "up") return;
                item.y++;
                break;
            }
          } else if(item.type === 'snakeBody') {
            var next = snake.items[i + 1];
            item.move(next.x, next.y);
          }
        }
      },
      grow: function () {
        var snakeBody = this.getBody();
        var lastItem = snakeBody[0];
        var newBodyItem = createSnakeBody(
          lastItem.x,
          lastItem.y,
        );
        this.items.unshift(newBodyItem);
        return newBodyItem;
      },
      setDirection: function (direction) {
        this.direction = direction;
      },
    };
    snake.items.push(
      createSnakeBody(0, 0),
      createSnakeBody(1, 0),
      createSnakeBody(2, 0),
      createSnakeHead(3, 0)
    );
    return snake;
  }

  function createSnakeBody(x, y) {
    var snakeBody = createSnakeBase(x, y);
    snakeBody.type = "snakeBody";
    snakeBody.element.className = "snakeBody";
    return snakeBody;
  }

  function createSnakeHead(x, y) {
    var snakeHead = createSnakeBase(x, y);
    snakeHead.type = "snakeHead";
    snakeHead.element.className = "snakeHead";
    return snakeHead;
  }

  function createSnakeBase(x, y) {
    var snakeBase = {};
    snakeBase.x = x;
    snakeBase.y = y;
    snakeBase.element = document.createElement("div");
    snakeBase.element.style.left = x + "px";
    snakeBase.element.style.top = y + "px";
    snakeBase.element.style.width = ITEM_SIZE + "px";
    snakeBase.element.style.height = ITEM_SIZE + "px";
    snakeBase.element.style.transition = 'all linear '+ SPEED + 'ms';
    snakeBase.render = function () {
      this.element.style.left = this.x * ITEM_SIZE + "px";
      this.element.style.top = this.y * ITEM_SIZE + "px";
    };
    snakeBase.move = function (x, y) {
      snakeBase.x = x;
      snakeBase.y = y;
    };
    snakeBase.updateDirection = function (direction) {
      this.direction = direction;
    };
    return snakeBase;
  }

  // 食物
  function createFood(snake) {
    var food = {
      x: 0,
      y: 0,
      element: document.createElement("div"),
      update: function (snake, foods = []) {
        this.x = Math.floor(
          Math.random() * (game.width - 1) + 1
          );
        this.y = Math.floor(
          Math.random() * (game.height - 1) + 1
        );
        if (this.checkCollision(snake, foods)) {
          this.render();
        }
      },
      render: function () {
        this.element.style.left = this.x * ITEM_SIZE + "px";
        this.element.style.top = this.y * ITEM_SIZE + "px";
      },
      checkCollision: function (snake, foods = []) {
        var head = snake.getHead();
        if (
          (head.x === this.x && head.y === this.y)
          || foods.concat(snake.items).some(function (item) {
            if (item === this) return;
            return item.x === this.x && item.y === this.y;
          }.bind(this))
        ) {
          this.update(snake);
          return false;
        }
        return true;
      },
    };
    food.element.className = "food";
    food.element.style.width = ITEM_SIZE + "px";
    food.element.style.height = ITEM_SIZE + "px";
    food.update(snake);
    return food;
  }
}

window.onload = bootstrap;
