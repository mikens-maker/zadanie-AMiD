import java.awt.GridLayout;

import javax.swing.JButton;
import javax.swing.JFrame;

public class LayoutManagers extends JFrame {

    public LayoutManagers() {
        super( "Not Hello World" );
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(300, 100);
        setLocation(50,50);
        setLayout(new GridLayout(2, 6));

        for(int i=0; i<10; i++)
            add(new JButton(""+(i+1)));

        setVisible(true);
    }

}