package com.taotao.shop.service;

import com.taotao.pojo.TbSeller;
import com.taotao.sellergoods.service.SellerService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.List;

/**
 * 认证类
 */
public class UserDetailServiceImpl implements UserDetailsService {
    private SellerService sellerService;

    public void setSellerService(SellerService sellerService) {
        this.sellerService = sellerService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_SELLER"));
        //得到商家对象
        TbSeller seller = sellerService.findOne(username);
        if(seller != null){
            if(seller.getStatus().equals("1")){
                return new User(username,seller.getPassword(),grantedAuthorities);
            }else{
                return null;
            }
        }else{
            return null;
        }
    }
}
