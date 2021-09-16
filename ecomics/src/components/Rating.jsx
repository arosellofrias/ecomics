import * as React from "react";

const NewPost = () => {
  const [clicked, setClicked] = React.useState ([false, false, false, false, false]);

  const handleStarClick = (e, index) => {
    e.preventDefault();
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      if (i <= index) clickStates[i] = true;
      else clickStates[i] = false;
    }

    setClicked(clickStates);
  };

  return (
    <div className={styles.rating}>
      <p>Rating</p>
      <div>
        <FaStar
          onClick={(e) => handleStarClick(e, 0)}
          className={clicked[0] ? styles.clickedstar : null}
        />
        <FaStar
          onClick={(e) => handleStarClick(e, 1)}
          className={clicked[1] ? styles.clickedstar : null}
        />
        <FaStar
          onClick={(e) => handleStarClick(e, 2)}
          className={clicked[2] ? styles.clickedstar : null}
        />
        <FaStar
          onClick={(e) => handleStarClick(e, 3)}
          className={clicked[3] ? styles.clickedstar : null}
        />
        <FaStar
          onClick={(e) => handleStarClick(e, 4)}
          className={clicked[4] ? styles.clickedstar : null}
        />
      </div>
    </div>
  );
};

export default NewPost;
