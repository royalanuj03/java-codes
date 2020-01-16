import java.util.*;
public class  addition
{
    public static void main(String[] args)
    {
       Scanner scn = new Scanner(System.in);
       int n = scn.nextInt();
       int sum = 0;
       for(int i =1;i<=n;i++)
       {
           int num = scn.nextInt();
            sum = sum+num;
       }
       System.out.println("---------");
       System.out.println(sum);
    }
}