import React from 'react';
import PropTypes from 'prop-types';
import styles from './RefineByFilter.module.scss';

import { Text, Button, DropdownSearch } from 'components';

class RefineByFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: {
        paymentStatus: 'any',
        stage: {
          draft: false,
          active: false,
          completed: false,
          expired: false,
          killed: false
        },
        categories: []
      }
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
  }

  onInputChange(prop, value) {
    let tempFilter = Object.assign({}, this.state.filter);
    if (prop === 'paymentStatus') {
      tempFilter[prop] = value;
    }
    if (prop === 'stage') {
      tempFilter[prop][value] = !this.state.filter.stage[value];
    }
    if (prop === 'categories') {
      tempFilter[prop] = value;
    }

    this.setState({ filter: tempFilter }, () =>
      this.props.onChange(tempFilter)
    );
  }

  clearFilter() {
    const filter = {
      paymentStatus: 'any',
      stage: {
        draft: false,
        active: false,
        completed: false,
        expired: false,
        killed: false
      },
      categories: []
    };

    this.setState({ filter });
    if (this.DropdownSearchComponent) {
      this.DropdownSearchComponent.clearFilters();
    }
    this.props.onChange(filter);
  }

  render() {
    const { dropdown, dropdownOptions } = this.props;

    return (
      <div
        className={`${styles.filter} ${styles[dropdown ? 'withDropdown' : '']}`}
      >
        <div className={`${styles.titleBar}`}>
          <Text style="H4">Refine By:</Text>
          <Button style="clearFilter" size="small" onClick={this.clearFilter}>
            Clear Filters
          </Button>
        </div>
        <div className={`${styles.stages}`}>
          <Text style="Body">Stage</Text> <br />
          <input
            type="checkbox"
            checked={this.state.filter.stage.draft}
            onChange={() => this.onInputChange('stage', 'draft')}
          />{' '}
          <Text>Drafts</Text> <br />
          <input
            type="checkbox"
            checked={this.state.filter.stage.active}
            onChange={() => this.onInputChange('stage', 'active')}
          />{' '}
          <Text>Active</Text> <br />
          <input
            type="checkbox"
            checked={this.state.filter.stage.completed}
            onChange={() => this.onInputChange('stage', 'completed')}
          />{' '}
          <Text>Completed</Text> <br />
          <input
            type="checkbox"
            checked={this.state.filter.stage.expired}
            onChange={() => this.onInputChange('stage', 'expired')}
          />{' '}
          <Text>Expired</Text> <br />
          <input
            type="checkbox"
            checked={this.state.filter.stage.killed}
            onChange={() => this.onInputChange('stage', 'killed')}
          />{' '}
          <Text>Killed</Text> <br />
        </div>
        <div className={`${styles.paymentStatus}`}>
          <Text style="Body">Payment Status</Text> <br />
          <input
            type="radio"
            checked={this.state.filter.paymentStatus === 'any'}
            onChange={() => this.onInputChange('paymentStatus', 'any')}
          />{' '}
          <Text>Any</Text> <br />
          <input
            type="radio"
            checked={this.state.filter.paymentStatus === 'paid'}
            onChange={() => this.onInputChange('paymentStatus', 'paid')}
          />{' '}
          <Text>Paid</Text> <br />
          <input
            type="radio"
            checked={this.state.filter.paymentStatus === 'unpaid'}
            onChange={() => this.onInputChange('paymentStatus', 'unpaid')}
          />{' '}
          <Text>Unpaid</Text> <br />
        </div>
        {dropdown && (
          <div className={`${styles.dropdownSearch}`}>
            <DropdownSearch
              ref={DropdownSearchComponent =>
                (this.DropdownSearchComponent = DropdownSearchComponent)
              }
              options={dropdownOptions}
              placeholder="e.g. HTML"
              onChange={e => this.onInputChange('categories', e)}
            />
          </div>
        )}
      </div>
    );
  }
}

RefineByFilter.propTypes = {
  onChange: PropTypes.func
};

RefineByFilter.defaultProps = {
  onChange: filter => {
    console.log(filter);
  }
};

export default RefineByFilter;
