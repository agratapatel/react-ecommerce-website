import React from 'react';
import './styles.scss';

const Directory = props => {
    return (
      <div className="directory">
        <div className="wrap">
          <div
            className="item"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1557844352-761f2565b576?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80)`,
            }}
          >
            <a>Shop Veggies</a>
          </div>

          <div
            className="item"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1516594798947-e65505dbb29d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80)`,
            }}
          >
            <a>Shop Fruits</a>
          </div>
        </div>
      </div>
    );
};

export default Directory;