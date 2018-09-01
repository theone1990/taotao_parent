import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;
import java.util.Set;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:spring/applicationContext-redis.xml")
public class TestValueHash {

    @Autowired
    private RedisTemplate redisTemplate;

    @Test
    public void setValue(){
        redisTemplate.boundHashOps("namehash").put("a","小米");
        redisTemplate.boundHashOps("namehash").put("b","华为");
        redisTemplate.boundHashOps("namehash").put("c","苹果");
    }

    @Test
    public void getKeys(){
        Set namehash = redisTemplate.boundHashOps("namehash").keys();
        System.out.println(namehash);
    }

    @Test
    public void getValues(){
        List namehash = redisTemplate.boundHashOps("namehash").values();
        System.out.println(namehash);
    }

    @Test
    public void getValueByKey(){
        Object o = redisTemplate.boundHashOps("namehash").get("b");
        System.out.println(o);
    }

    @Test
    public void deleteValueByKey(){
        redisTemplate.boundHashOps("namehash").delete("c");
    }
}
