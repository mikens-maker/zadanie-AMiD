import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

public class Z_klawiatura extends JFrame implements KeyListener {
    private JLabel label;

    public Z_klawiatura() {
        super("Okno 5: Zdarzenia - Klawiatura");
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        setSize(400, 150);
        setLocation(750, 50);

        JPanel panel = new JPanel();
        label = new JLabel("Naciśnij klawisz, gdy okno jest aktywne...");
        panel.add(label);
        add(panel);

        this.addKeyListener(this);
        this.setFocusable(true);

        setVisible(true);
    }

    @Override
    public void keyTyped(KeyEvent e) {
        label.setText("Wpisano znak: " + e.getKeyChar());
    }

    @Override public void keyPressed(KeyEvent e) {}
    @Override public void keyReleased(KeyEvent e) {}
}