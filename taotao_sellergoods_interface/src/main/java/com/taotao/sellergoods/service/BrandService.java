package com.taotao.sellergoods.service;

import com.taotao.entity.PageResult;
import com.taotao.pojo.TbBrand;

import java.util.List;
import java.util.Map;

public interface BrandService {

    List<TbBrand> findAll();

    /**
     * 返回分页列表
     */
    PageResult findPage(int pageNum, int pageSize);

    /**
     * 增加
     */
    void add(TbBrand brand);

    /**
     * 回显
     */
    TbBrand findOne(Long id);

    /**
     * 更新
     */
    void update(TbBrand brand);

    /**
     * 批量删除
     */
    void delete(Long[] ids);

    /**
     * 查询
     */
    PageResult search(TbBrand brand, int pageNum, int pageSize);

    /**
     * 品牌下拉数据
     */
    List<Map> selectOptionList();
}
