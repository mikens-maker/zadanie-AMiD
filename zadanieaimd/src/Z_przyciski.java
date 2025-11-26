import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JOptionPane;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Z_przyciski extends JFrame implements ActionListener {
    public Z_przyciski() {
        super("Okno 4: Zdarzenia - Przyciski");
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        setLayout(new FlowLayout());

        JButton button = new JButton("Kliknij mnie (ActionListener)");
        button.addActionListener(this);

        add(button);
        setSize(350, 100);
        setLocation(500, 50);
        setVisible(true);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        JOptionPane.showMessageDialog(this, "Wciśnięto przycisk!");
    }
}