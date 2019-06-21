import React from 'react';
import Toolbar from 'react-big-calendar/lib/Toolbar';

class CustomToolbar extends Toolbar {
    render() {
        return (
            <div className='rbc-toolbar'>
                <span className="rbc-btn-group">
                    <button type="button" onClick={() => this.navigate('PREV')}>
                        <img className="arrow" src="arrow-left.png" onClick={() => this.navigate('PREV')}/>
                    </button>
                    <span className="rbc-toolbar-label">{this.props.label}</span>
                    <button type="button" onClick={() => this.navigate('NEXT')}>
                        <img className="arrow" src="arrow-right.png" />
                    </button>
                </span>
                <div className="rbc-btn-group">
                    <button type="button" onClick={this.view.bind(null, 'month')}>Month</button>
                    <button type="button" onClick={this.view.bind(null, 'week')}>Week</button>
                </div>
            </div>
        );
    }
}

export default CustomToolbar;
