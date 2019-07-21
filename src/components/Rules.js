import React from 'react';

export default function Rules() {
  return (
    <>
      <div className="rules">
        <h3>There are only 2 rules:</h3>
        <p>
          1) If the cell is alive and has 2 or 3 neighbors, then it remains
          alive. Else it dies.
        </p>
        <p>
          2) If the cell is dead and has exactly 3 neighbors, then it comes to
          life. Else if remains dead.
        </p>
      </div>
    </>
  );
}
