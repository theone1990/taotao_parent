import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Set;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:spring/applicationContext-redis.xml")
public class TestValueSet {

    @Autowired
    private RedisTemplate redisTemplate;

    @Test
    public void setValue(){
        redisTemplate.boundSetOps("nameset").add("小米");
        redisTemplate.boundSetOps("nameset").add("华为");
        redisTemplate.boundSetOps("nameset").add("苹果");
    }

    @Test
    public void getValue(){
        Set nameset = redisTemplate.boundSetOps("nameset").members();
        System.out.println(nameset);
    }

    @Test
    public void deleteValue(){
        redisTemplate.boundSetOps("nameset").remove("小米");
    }

    @Test
    public void deleteAll(){
        redisTemplate.delete("nameset");
    }
}
