import React from 'react';
import { configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';


configure({adapter: new Adapter()});

describe('Navigation Items',()=>{
let wrapper;
beforeEach(()=>{
    wrapper = shallow(<NavigationItems/>);
});

it('should render 2 navigation Item elements if not authenticated',()=>{
expect(wrapper.find(NavigationItem)).toHaveLength(2);
});

it('should render 3 navigation Item elements if authenticated',()=>{
    wrapper.setProps({
        isAuthenticated : true
    })
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render logout navigation item if authenticated',()=>{
        wrapper.setProps({
            isAuthenticated : true
        })
        expect(wrapper.contains(<NavigationItem link= "/logOut" >LogOut</NavigationItem>)).toEqual(true);





        });
});