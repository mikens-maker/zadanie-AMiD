import javax.swing.JFrame;
import javax.swing.JLabel;
import java.awt.BorderLayout;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

public class Z_mysz extends JFrame implements MouseListener {
    private JLabel statusLabel;

    public Z_mysz() {
        super("Okno 6: Zdarzenia - Mysz");
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        setSize(400, 200);
        setLocation(500, 200);

        statusLabel = new JLabel("Kliknij w dowolnym miejscu okna...", JLabel.CENTER);
        add(statusLabel, BorderLayout.SOUTH);

        this.addMouseListener(this);

        setVisible(true);
    }

    @Override
    public void mouseClicked(MouseEvent e) {
        statusLabel.setText("Kliknięto na pozycji: [" + e.getX() + ", " + e.getY() + "]");
    }

    @Override public void mousePressed(MouseEvent e) {}
    @Override public void mouseReleased(MouseEvent e) {}
    @Override public void mouseEntered(MouseEvent e) {}
    @Override public void mouseExited(MouseEvent e) {}
}