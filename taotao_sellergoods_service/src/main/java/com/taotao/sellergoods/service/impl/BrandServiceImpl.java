package com.taotao.sellergoods.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.taotao.mapper.TbBrandMapper;
import com.taotao.pojo.TbBrand;
import com.taotao.sellergoods.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Service
public class BrandServiceImpl implements BrandService {
    @Autowired
    private TbBrandMapper brandMapper;

    @Override
    public List<TbBrand> findAll() {
        return brandMapper.selectByExample(null);
    }
}
