import org.csource.fastdfs.*;
import org.junit.Test;

public class TestFastDFS {

    @Test
    public void delete(){
        try {
            ClientGlobal.init("F:\\IdeaProject\\taotao_parent\\taotao_shop_web\\src\\main\\resources\\config\\fastdfs_client.conf");
            TrackerClient trackerClient = new TrackerClient();
            TrackerServer trackerServer = trackerClient.getConnection();
            StorageServer storageServer = null;
            StorageClient storageClient = new StorageClient(trackerServer, storageServer);
            int i = storageClient.delete_file("group1", "M00/00/00/wKgZhVt73jyAfsuQAAJRIbOzJMY698.jpg");
            System.out.println(i==0 ? "删除成功" : "删除失败"+i);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
