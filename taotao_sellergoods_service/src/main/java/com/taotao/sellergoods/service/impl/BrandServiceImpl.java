package com.taotao.sellergoods.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.taotao.entity.PageResult;
import com.taotao.mapper.TbBrandMapper;
import com.taotao.pojo.TbBrand;
import com.taotao.pojo.TbBrandExample;
import com.taotao.sellergoods.service.BrandService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

@Service
public class BrandServiceImpl implements BrandService {
    @Autowired
    private TbBrandMapper brandMapper;

    @Override
    public List<TbBrand> findAll() {
        return brandMapper.selectByExample(null);
    }

    @Override
    public PageResult findPage(int pageNum, int pageSize) {
        PageHelper.startPage(pageNum,pageSize);
        Page<TbBrand> page = (Page<TbBrand>) brandMapper.selectByExample(null);
        return new PageResult(page.getTotal(),page.getResult());
    }

    @Override
    public void add(TbBrand brand) {
        brandMapper.insert(brand);
    }

    @Override
    public TbBrand findOne(Long id) {
        return brandMapper.selectByPrimaryKey(id);
    }

    @Override
    public void update(TbBrand brand) {
        brandMapper.updateByPrimaryKey(brand);
    }

    @Override
    public void delete(Long[] ids) {
        TbBrandExample example = new TbBrandExample();
        TbBrandExample.Criteria criteria = example.createCriteria();
        criteria.andIdIn(Arrays.asList(ids));
        brandMapper.deleteByExample(example);
    }

    @Override
    public PageResult search(TbBrand brand, int pageNum, int pageSize) {
        PageHelper.startPage(pageNum,pageSize);
        TbBrandExample example = new TbBrandExample();
        TbBrandExample.Criteria criteria = example.createCriteria();
        if(brand != null){
            if(StringUtils.isNotBlank(brand.getName())){
                criteria.andNameLike("%"+brand.getName()+"%");
            }
            if(StringUtils.isNotBlank(brand.getFirstChar())){
                criteria.andFirstCharEqualTo(brand.getFirstChar());
            }
        }
        Page<TbBrand> page = (Page<TbBrand>) brandMapper.selectByExample(example);
        return new PageResult(page.getTotal(),page.getResult());
    }

    @Override
    public List<Map> selectOptionList() {
        List<Map> mapList = new ArrayList<>();
        List<TbBrand> brandList = brandMapper.selectByExample(null);
        for (TbBrand tbBrand : brandList) {
            Map map = new HashMap();
            map.put("id",tbBrand.getId());
            map.put("text",tbBrand.getName());
            mapList.add(map);
        }
        return mapList;
    }
}
